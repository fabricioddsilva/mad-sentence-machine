package com.kaos.madsentencemachine.services;

import com.kaos.madsentencemachine.entities.Story;
import com.kaos.madsentencemachine.entities.dto.StoryDTO;
import com.kaos.madsentencemachine.services.exceptions.StoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;
import com.kaos.madsentencemachine.repositories.StoryRepository;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StoryService {

    @Autowired
    private StoryRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public void insert(Story story){
        repository.save(story);
    }

    public void insertRate(String id, String data){
        if(repository.existsById(id)){
            Story story = repository.findById(id).get();
            story.setRate(data);
            repository.save(story);
        } else {
            throw new StoryNotFoundException("Story not found");
        }
    }

    public StoryDTO findRandomStoryWithRateCount(){
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.sample(1)
        );

        AggregationResults<Story> result = mongoTemplate.aggregate(aggregation, "stories", Story.class);
        Story randomStory = result.getUniqueMappedResult();


        if(randomStory == null){
            return null;
        }

        Map<String, Long> rateCount = randomStory.getRate().stream()
                .collect(Collectors.groupingBy(rate -> rate, Collectors.counting()));

        return new StoryDTO(randomStory.getId(), randomStory.getText(), rateCount);
    }


}
