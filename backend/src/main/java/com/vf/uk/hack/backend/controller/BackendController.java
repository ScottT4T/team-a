package com.vf.uk.hack.backend.controller;

import com.vf.uk.hack.backend.model.HelloWorld;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = {""}, produces = MediaType.APPLICATION_JSON_VALUE)
public class BackendController {

  @GetMapping("")
  public HelloWorld getHelloWorld() {
    return new HelloWorld().setHello("world");
  }
}