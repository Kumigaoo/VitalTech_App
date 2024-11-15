using HospitalAPI;
using HospitalApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.Cookies;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDistributedMemoryCache();

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", builder =>
        {
            builder.WithOrigins("http://localhost:4201")
                   .AllowCredentials()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
    });

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Login"; 
        options.LogoutPath = "/Logout";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
    });

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
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
            AuthorizationCode  = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri("https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/auth"),
                TokenUrl = new Uri("https://login.oscarrovira.com/realms/Dream%20Team/protocol/openid-connect/token"),
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
            []
        }
    });
});

var app = builder.Build();

app.UseSession();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hospital API V1");
        c.RoutePrefix = "swagger";
        c.OAuthClientId("hospital-api");
        c.OAuthAppName("Swagger UI");
        c.OAuthScopeSeparator(" ");
        c.OAuthUseBasicAuthenticationWithAccessCodeGrant();
    });
}



app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
