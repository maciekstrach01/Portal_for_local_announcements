package pl.pk.localannouncements.usermanagement;

import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import java.lang.reflect.Constructor;

public class DtoTestHelper {

    public static <T> T createDto(Class<T> dtoClass, Object... args) {
        try {
            Class<?>[] parameterTypes = new Class[args.length];
            for (int i = 0; i < args.length; i++) {
                parameterTypes[i] = args[i].getClass();
            }
            Constructor<T> constructor = dtoClass.getDeclaredConstructor(parameterTypes);
            constructor.setAccessible(true);
            return constructor.newInstance(args);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create " + dtoClass.getSimpleName() + " instance", e);
        }
    }

    public static RegisterUserDto createRegisterUserDto(String email, String password, String firstName, String lastName, String confirmPassword) {
        return createDto(RegisterUserDto.class, email, firstName, lastName, password, confirmPassword);
    }

    public static AuthenticateUserDto createAuthenticateUserDto(String email, String password) {
        return createDto(AuthenticateUserDto.class, email, password);
    }

}
