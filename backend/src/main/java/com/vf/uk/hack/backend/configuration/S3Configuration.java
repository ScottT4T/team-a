package com.vf.uk.hack.backend.configuration;


import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Configuration {

    public static final int PORT_MOCK = 3344;

    @ConditionalOnBean(S3MockServer.class)
    @Bean("upgradesAndOffersS3Bean")
    public AmazonS3 createMockingS3(
            final @Value("${dxl.s3.endpoint:http://localhost:" + PORT_MOCK + "}") String s3Endpoint) {
        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials("any", "any")))
                .withPathStyleAccessEnabled(true)
                .withEndpointConfiguration(new EndpointConfiguration(s3Endpoint, "")).build();
    }

}

