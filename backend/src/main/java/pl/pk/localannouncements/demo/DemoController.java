package pl.pk.localannouncements.demo;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/demo")
@Hidden
class DemoController {

    @GetMapping
    public ResponseEntity<Map<String, String>> sayHello() {
        Map<String, String> response = Map.of("msg", "Hello from secured endpoint");
        return ResponseEntity.ok(response);
    }

}
