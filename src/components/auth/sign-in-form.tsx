import { signIn } from "@/lib/auth-client";
import { SignInInputValidation, signInSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export const SignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<SignInInputValidation>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInInputValidation) => {
    setLoading(true);
    await signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error) => {
          setLoading(false);
          toast.error(error.error.message);
        },
      },
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid gap-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="name@example.com"
                    type="email"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage {...field} className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" disabled={loading} />
                </FormControl>
                <FormMessage {...field} className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Sign In
          {loading && <Loader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
