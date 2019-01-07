package com.flaviotps.DevMedia.controller;

import com.flaviotps.DevMedia.model.PessoaModel;
import com.flaviotps.DevMedia.service.PessoaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Api(value = "API REST Pessoas")
public class PessoaController {

    @Autowired
    PessoaService pessoaService;


    @ApiOperation(value = "Retorna uma lista de pessoas")
    @GetMapping("/pessoas")
    public List<PessoaModel> getAllUsers() {
        return pessoaService.findAll();
    }

    @ApiOperation(value = "Retorna uma pessoa")
    @GetMapping("/pessoas/{id}")
    public PessoaModel getUserById(@PathVariable("id") long id) {
        return pessoaService.findById(id);
    }

    @ApiOperation(value = "Cria uma nova pessoa")
    @PostMapping("/pessoas")
    public void createUser(@RequestBody PessoaModel user) {
        pessoaService.save(user);
    }

    @ApiOperation(value = "Atualiza uma pessoa existente")
    @PutMapping("/pessoas")
    public void updateUser(@RequestBody PessoaModel user) {
        pessoaService.save(user);
    }

    @ApiOperation(value = "Deleta uma pessoa existente")
    @DeleteMapping("/pessoas/{id}")
    public void deleteUserById(@PathVariable("id") long id) {
        pessoaService.deleteById(id);
    }


}
