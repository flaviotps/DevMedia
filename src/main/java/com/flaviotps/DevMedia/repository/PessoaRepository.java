package com.flaviotps.DevMedia.repository;

import com.flaviotps.DevMedia.model.PessoaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<PessoaModel, Long> {
    PessoaModel findById(long id);

}
