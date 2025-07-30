import { Stack, router } from "expo-router";
import { Formik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/stores/useAuthStore";

// Validation schema
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .trim(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const { signUp, loading, error, clearError } = useAuthStore();

  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleRegister = async (values: FormValues) => {
    try {
      clearError();
      await signUp({
        email: values.email.trim(),
        password: values.password,
      });
      router.replace("/(tabs)/home");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: "Register",
          headerBackTitle: "Home",
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <ThemedView style={styles.formContainer}>
              <ThemedText style={styles.title}>Create Account</ThemedText>

              {error && (
                <ThemedText style={styles.errorText}>
                  {error.message}
                </ThemedText>
              )}

              <ThemedView style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!loading}
                />
                {touched.email && errors.email && (
                  <ThemedText style={styles.fieldErrorText}>
                    {errors.email}
                  </ThemedText>
                )}
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.password && errors.password && styles.inputError,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#666"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
                {touched.password && errors.password && (
                  <ThemedText style={styles.fieldErrorText}>
                    {errors.password}
                  </ThemedText>
                )}
              </ThemedView>

              <ThemedView style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.confirmPassword &&
                      errors.confirmPassword &&
                      styles.inputError,
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#666"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <ThemedText style={styles.fieldErrorText}>
                    {errors.confirmPassword}
                  </ThemedText>
                )}
              </ThemedView>

              <TouchableOpacity
                style={[
                  styles.button,
                  (loading || !isValid) && styles.buttonDisabled,
                ]}
                onPress={() => handleSubmit()}
                disabled={loading || !isValid}
              >
                <ThemedText style={styles.buttonText}>
                  {loading ? "Registering..." : "Register"}
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => router.push("/login")}
                disabled={loading}
              >
                <ThemedText style={styles.linkText}>
                  Already have an account? Login
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    height: 48,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#007AFF",
  },
  errorText: {
    color: "#FF3B30",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  fieldErrorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 0,
    marginLeft: 4,
  },
});
