import com.hotel.repo.ReservationRepository;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ReservationRepositoryTest {

    @Test
    void testReservationNotExists() {

        ReservationRepository repo = new ReservationRepository();

        boolean exists = repo.existsByReservationNo("TEST999");

        assertFalse(exists);
    }

    @Test
    void testDeleteReservation() {

        ReservationRepository repo = new ReservationRepository();

        boolean result = repo.deleteByReservationNo("TEST999");

        assertFalse(result);
    }

}