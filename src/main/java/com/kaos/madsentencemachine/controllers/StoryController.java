package com.kaos.madsentencemachine.controllers;

import com.kaos.madsentencemachine.entities.Story;
import com.kaos.madsentencemachine.entities.dto.StoryDTO;
import com.kaos.madsentencemachine.services.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryService service;

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody Story data){
        service.insert(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> insertRate(@PathVariable(name = "id") String id, @RequestBody String data){
        service.insertRate(id, data);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @GetMapping
    public ResponseEntity<StoryDTO> find(){
        return ResponseEntity.ok().body(service.findRandomStoryWithRateCount());
    }
}
