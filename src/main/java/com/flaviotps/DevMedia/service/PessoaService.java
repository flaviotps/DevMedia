package com.flaviotps.DevMedia.service;


import com.flaviotps.DevMedia.model.PessoaModel;
import com.flaviotps.DevMedia.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {


    @Autowired
    PessoaRepository pessoaRepository;


    public List<PessoaModel> findAll() {
        return pessoaRepository.findAll();
    }

    public void save(PessoaModel user) {
        pessoaRepository.save(user);
    }

    public PessoaModel findById(long id) {
        return pessoaRepository.findById(id);
    }

    public void deleteById(long id) {
        pessoaRepository.deleteById(id);
    }

}
