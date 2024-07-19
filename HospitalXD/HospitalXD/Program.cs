

using HospitalXD;
using HospitalXD.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Afegim un nou servei, un servei en aquest context es quelcom que proporcioni
// alguna funcionalitat. A mes al crea un nou servei posem aquest al contenidor de injeccio de dependecies
// que es un espai on estan tots els serveis llestos per ser injectats al constructor de qualsevol classe
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Afegim el servei de mapeig a la nostra api, ara en qualsevol punt de la nostra
// aplicacio podrem injectar al construcor el automapper
builder.Services.AddAutoMapper(typeof(MapConfig));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
