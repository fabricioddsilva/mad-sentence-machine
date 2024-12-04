package com.kaos.madsentencemachine.repositories;

import com.kaos.madsentencemachine.entities.Story;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends MongoRepository<Story, String> {
}
