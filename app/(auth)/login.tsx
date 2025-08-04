import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";
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

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .trim(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

interface FormValues {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const { signIn, loading, error } = useAuthStore();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values: FormValues) => {
    try {
      const user = await signIn(values.email.trim(), values.password);
      if (user) {
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      // Error is handled by the store
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: "Sign In",
          headerBackTitle: "Back",
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
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
              <ThemedText style={styles.title}>Welcome Back</ThemedText>

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

              <Button
                title={loading ? "Signing in..." : "Sign In"}
                onPress={() => handleSubmit()}
                disabled={loading || !isValid}
                style={styles.button}
                variant={loading || !isValid ? "disabled" : "primary"}
              />

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => router.push("/register")}
                disabled={loading}
              >
                <ThemedText style={styles.linkText}>
                  Don&apos;t have an account? Register
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
  inputContainer: {
    marginBottom: 16,
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
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 1,
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
  fieldErrorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 0,
    marginLeft: 4,
  },
});
