package org.sid.notificationservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
@Data // Lombok annotation to generate getters, setters, toString, and other utility methods
@AllArgsConstructor // Lombok annotation to generate a constructor with all fields
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor
@Builder // Lombok annotation to provide a builder pattern for this class
public class GenerateNotificationContentRequest {

    private NotificationType notificationType; // The type of notification (e.g., Event, Salary Change)

    private Map<String, String> dynamicValues; // A map to hold dynamic values that can be replaced in the notification template

}
