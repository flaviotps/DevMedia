package com.flaviotps.DevMedia.controller;

import com.flaviotps.DevMedia.model.PessoaModel;
import com.flaviotps.DevMedia.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class PessoaController {

    @Autowired
    PessoaService pessoaService;


    @GetMapping("/pessoas")
    public List<PessoaModel> getAllUsers() {
        return pessoaService.findAll();
    }

    @GetMapping("/pessoas/{id}")
    public PessoaModel getUserById(@PathVariable("id") long id) {
        return pessoaService.findById(id);
    }

    @PostMapping("/pessoas")
    public void createUser(@RequestBody PessoaModel user) {
        pessoaService.save(user);
    }

    @PutMapping("/pessoas")
    public void updateUser(@RequestBody PessoaModel user) {
        pessoaService.save(user);
    }

    @DeleteMapping("/pessoas/{id}")
    public void deleteUserById(@PathVariable("id") long id) {
        pessoaService.deleteById(id);
    }


}
