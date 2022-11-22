package com.vf.uk.hack.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("pets")
@NoArgsConstructor
@Data
public class Pet {

    @Id
    private String id;
    private String name;
    private String imageURL;
    private int likeCount;
}
