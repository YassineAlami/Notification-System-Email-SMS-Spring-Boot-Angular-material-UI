package org.sid.notificationservice.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "notification_delivery") // Specifies the table name in the database
@Data // Lombok annotation to generate getters, setters, toString, and other utility methods
@AllArgsConstructor // Lombok annotation to generate a constructor with all fields
@NoArgsConstructor // Lombok annotation to generate a no-argument constructor
@Builder // Lombok annotation to provide a builder pattern for this class
public class NotificationDelivery {

    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies that the ID should be generated by the database
    private Long id; // Unique identifier for the notification delivery record

    @ManyToOne // Defines a many-to-one relationship with the Notification entity
    @JoinColumn(name = "notification_id" /*, nullable = false*/) // Specifies the foreign key column in this table referencing the Notification
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // Prevents this field from being serialized in JSON responses
    private Notification notification; // The notification associated with this delivery

    @ManyToOne // Defines a many-to-one relationship with the DeliveryMethod entity
    @JoinColumn(name = "delivery_method_id" /*, nullable = false*/) // Specifies the foreign key column in this table referencing the DeliveryMethod
    private DeliveryMethod deliveryMethod; // The delivery method used for this notification

    //@Column(nullable = false) // Uncomment to enforce a non-null constraint on status
    private String status; // Status of the notification delivery (e.g., sent, pending)

    //@Column(nullable = false) // Uncomment to enforce a non-null constraint on timestamp
    private LocalDateTime timestamp; // Timestamp for when the notification delivery occurred

}
