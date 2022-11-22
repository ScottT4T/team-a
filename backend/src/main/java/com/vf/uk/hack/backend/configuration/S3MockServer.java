package com.vf.uk.hack.backend.configuration;

import com.amazonaws.services.s3.AmazonS3;
import com.vf.uk.hack.backend.model.Pet;
import com.vf.uk.hack.backend.repository.PetRepository;
import io.findify.s3mock.S3Mock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.File;
import java.net.BindException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Random;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class S3MockServer {
    private static final String ENDPOINT = "http://localhost:" + S3Configuration.PORT_MOCK;
    private static final String BUCKET_NAME = "pets";

    private final PetRepository petRepository;

    @PostConstruct
    public void onInit() throws URISyntaxException {
        startMockServer();
        uploadMockFiles();
    }

    private void startMockServer() {
        final S3Mock mockS3 = new S3Mock.Builder().withPort(S3Configuration.PORT_MOCK).withInMemoryBackend().build();
        try {
            mockS3.start();
            log.info( "MOCK: Local S3 Server STARTED: {}", ENDPOINT);
        }
        catch (Exception ex) {
            // Check for BindException, if found there is another version running, just use that
            if (!(ex.getCause() instanceof BindException)) {
                throw ex;
            }
            log.info( "MOCK: Mocking S3 Server RUNNING: {}", ENDPOINT);
        }
    }

    private void uploadMockFiles() throws URISyntaxException {
        final AmazonS3 amazonS3 = new S3Configuration().createMockingS3(ENDPOINT);
        amazonS3.createBucket(BUCKET_NAME);

        final URL mockingURL = S3MockServer.this.getClass().getResource("/mocking/s3");
        final File mockingFolder = new File(mockingURL.toURI());
        uploadFolder(amazonS3, "processed/", mockingFolder);
    }

    private void uploadFolder(final AmazonS3 amazonS3, final String folderPath, final File mockingFolder) {
        Random random = new Random();
        petRepository.deleteAll();
        File[] folderList = mockingFolder.listFiles();
        if (folderList != null) {
            for (final File file : folderList) {
                if (file.isDirectory()) {
                    uploadFolder(amazonS3, folderPath + file.getName() + "/", file);
                } else {
                    String key = folderPath + file.getName();
                    try {
                        amazonS3.putObject(BUCKET_NAME, key, file);
                        Pet pet = new Pet();
                        pet.setName(FilenameUtils.removeExtension(file.getName()));
                        pet.setImageURL("http://localhost:3344/pets/processed/" + file.getName());
                        pet.setLikeCount(random.nextInt(100));
                        Pet save = petRepository.save(pet);
                        log.info("save successful: {}", save);
                    } catch (Exception e) {
                        log.error(
                                "IOException while uploading file {} -> s3://{}/{}", file, BUCKET_NAME, key, e);
                    }
                }
            }
        }
    }
}
