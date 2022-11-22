package com.vf.uk.hack.backend.controller;

import com.vf.uk.hack.backend.model.HelloWorld;
import com.vf.uk.hack.backend.model.Pet;
import com.vf.uk.hack.backend.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class BackendController {

    private final PetRepository petRepository;

    @GetMapping("/api/ratePet")
    public ResponseEntity<Pet> ratePet(@RequestParam("id") String id, @RequestParam("like") boolean like) {
        Pet petById = petRepository.findPetById(id);
        if(like) {
            petById.setLikeCount(petById.getLikeCount()+1);
        } else {
            petById.setLikeCount(petById.getLikeCount()-1);
        }
        return ResponseEntity.ok(petRepository.save(petById));
    }

    @GetMapping("/api")
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(petRepository.findAll());
    }

    @GetMapping("/api/getHighscores")
    public ResponseEntity<List<Pet>> getHighScores() {
        final List<Pet> orderedPets = petRepository.findAll().stream()
                .sorted(Comparator.comparing(Pet::getLikeCount).reversed())
                .collect(Collectors.toList())
                .subList(0, 10);
        return ResponseEntity.ok(orderedPets);
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable("id") String id) {
        return ResponseEntity.ok(petRepository.findById(id).orElseThrow());
    }

    @PostMapping("/api")
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        return ResponseEntity.ok(petRepository.save(pet));
    }

}