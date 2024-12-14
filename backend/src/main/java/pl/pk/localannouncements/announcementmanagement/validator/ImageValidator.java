package pl.pk.localannouncements.announcementmanagement.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class ImageValidator implements ConstraintValidator<ValidImage, MultipartFile> {

    private long maxSize;
    private String[] allowedTypes;

    @Override
    public void initialize(ValidImage constraintAnnotation) {
        initializeParameters(constraintAnnotation);
    }

    private void initializeParameters(ValidImage constraintAnnotation) {
        this.maxSize = constraintAnnotation.maxSize();
        this.allowedTypes = constraintAnnotation.allowedTypes();
    }

    @Override
    public boolean isValid(MultipartFile image, ConstraintValidatorContext context) {
        if (image == null || image.isEmpty()) {
            return true;
        }

        if (image.getSize() > maxSize) {
            addConstraintViolation(context,
                    "Image size exceeds the maximum allowed size of " + (maxSize / (1024 * 1024)) + " MB");
            return false;
        }

        String contentType = image.getContentType();
        if (!isAllowedType(contentType)) {
            addConstraintViolation(context, "Image must be of type JPG, PNG, or GIF");
            return false;
        }

        return true;
    }

    private boolean isAllowedType(String contentType) {
        if (contentType == null) {
            return false;
        }
        for (String allowedType : allowedTypes) {
            if (allowedType.equals(contentType)) {
                return true;
            }
        }
        return false;
    }

    private void addConstraintViolation(ConstraintValidatorContext context, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
    }

}