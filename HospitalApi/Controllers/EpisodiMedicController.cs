﻿using AutoMapper;
using HospitalApi.Data;
using HospitalApi.DTO;
using HospitalAPI.DTO;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class EpisodiMedicController : ControllerBase
    {

        private readonly ILogger<EpisodiMedicController> _logger;
        private readonly ApplicationDbContext _bbdd;
        private readonly IMapper _mapper;

        public EpisodiMedicController(ILogger<EpisodiMedicController> logger, ApplicationDbContext bbdd, IMapper mapper)
        {
            _logger = logger;
            _bbdd = bbdd;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<EpisodiMedicDTO>>> GetEpisodisMedics()
        {

            _logger.LogInformation("Obtenint els episodis mèdics");

            IEnumerable<EpisodiMedic> eList = await _bbdd.EpisodisMedics.Include("Pacient").Include("Consultes").Include("Ingressos").ToListAsync();

            return Ok(_mapper.Map<IEnumerable<EpisodiMedicDTO>>(eList));

        }

        [HttpGet("id", Name = "GetEpi")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EpisodiMedicDTO>> GetEpisodi(int id)
        {
            if (id <= 0)
            {
                _logger.LogError("Error, format de ID incorrecte.");
                return BadRequest("Error, format de ID incorrecte.");
            } 
        
            var e = await _bbdd.EpisodisMedics.FirstOrDefaultAsync(h => h.Id == id);

            if (e == null)
            {
                _logger.LogError("Error, no existeix el episodi amb el ID " + id + ".");
                return NotFound("Error, no existeix el episodi amb el ID indicat.");
            }

            _logger.LogInformation("Episodi recuperat exitosament.");
            return Ok(_mapper.Map<EpisodiMedicDTO>(e));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EpisodiMedicCreateDTO>> PostHabitacio([FromBody] EpisodiMedicCreateDTO userEpiDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError("Error: dades introduïdes incorrectes.");
                return BadRequest(ModelState);
            }

            var pacient = await _bbdd.Pacients.FindAsync(userEpiDTO.PacientId);

            if (pacient == null)
            {
                _logger.LogError("Error: el ID de pacient proporcionat no existeix.");
                return BadRequest("Error: el ID de pacient proporcionat no existeix.");
            }

            EpisodiMedic episodi = _mapper.Map<EpisodiMedic>(userEpiDTO);
            episodi.PacientId = pacient.Id;

            await _bbdd.EpisodisMedics.AddAsync(episodi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Episodi creat exitosament.");
            return CreatedAtRoute("GetEpi", _mapper.Map<EpisodiMedicCreateDTO>(episodi));

        }

        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEpisodiMedic(int id)
        {

            if (id <= 0)
            {
                _logger.LogError("Error: format de id incorrecte.");
                return BadRequest(ModelState);
            }

            var epi = await _bbdd.EpisodisMedics.FirstOrDefaultAsync(h => h.Id == id);

            if (epi == null)
            {
                _logger.LogError("Error: no existeix l'episodi mèdic amb l'id indicat.");
                return NotFound("Error: no existeix l'episodi mèdic amb l'id indicat.");
            }
            

            _bbdd.EpisodisMedics.Remove(epi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Episodi esborrat amb èxit.");
            return NoContent();

        }

        [HttpPut("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateEpisodisMedics(int id, [FromBody] EpisodiMedicDTO userEpiDTO)
        {

            if (userEpiDTO == null || id != userEpiDTO.Id)
            {
                _logger.LogInformation("Error: no existe el ID indicado.");
                return BadRequest("Error: no existe el ID indicado.");
            }
            
            EpisodiMedic episodi = _mapper.Map<EpisodiMedic>(userEpiDTO);

            _bbdd.EpisodisMedics.Update(episodi);
            await _bbdd.SaveChangesAsync();

            _logger.LogInformation("Modificació complerta amb èxit.");
            return NoContent();

        }
    }
}
