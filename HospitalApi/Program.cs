using HospitalAPI;
using HospitalApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.WebHost.ConfigureKestrel(options =>
{
    options.AddServerHeader = false;
    options.ConfigureHttpsDefaults(config =>
    {
        config.SslProtocols = System.Security.Authentication.SslProtocols.Tls12;
    });
});


builder.Services.AddDistributedMemoryCache();

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", builder =>
        {
             builder.WithOrigins("https://localhost:7200")
                   .AllowCredentials()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
            builder.WithOrigins("http://localhost:4201")
                   .AllowCredentials()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
    });

builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(MapConfig));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = "https://login.oscarrovira.com/realms/Dream%20Team";
    options.Audience = "hospital-api";
    options.RequireHttpsMetadata = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true,
        ValidAudience = "hospital-api",
        ValidateIssuer = true,
        ValidIssuer = "https://login.oscarrovira.com/realms/Dream%20Team"
    };
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Hospital API", Version = "v1" });

    c.AddSecurityDefinition("Keycloak", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            Implicit = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri("https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/auth"),
                Scopes = new Dictionary<string, string>
                {
                    { "openid", "openid" },
                    { "profile", "profile" }
                }
            }
        }
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Keycloak",
                    Type = ReferenceType.SecurityScheme
                },
                In = ParameterLocation.Header,
                Name = "Bearer",
                Scheme = "Bearer"
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;            
    options.Cookie.IsEssential = true;
});

var app = builder.Build();
app.UseHttpsRedirection();

// builder.Logging.AddFile("Logs/myapp-{Date}.txt");


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hospital API V1");
        c.RoutePrefix = "swagger";
        c.OAuthClientId("hospital-api");
        c.OAuthAppName("Hospital API");
        c.OAuthScopeSeparator(" ");
    });
}

app.UseSession();
app.UseRouting(); // Debe ir antes de UseCors, UseAuthentication y UseAuthorization
app.UseCors("AllowSpecificOrigin"); // Debe ir antes de UseAuthentication y UseAuthorization
app.UseAuthentication(); // Debe ir antes de UseAuthorization
app.UseAuthorization(); // Debe ir después de UseAuthentication

app.MapControllers();

app.Run();
