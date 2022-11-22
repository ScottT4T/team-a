package com.vf.uk.hack.backend.repository;

import com.vf.uk.hack.backend.model.Pet;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PetRepository extends MongoRepository<Pet, String> {
    Pet findPetById(@NonNull String id);
}
