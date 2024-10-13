import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoginAdminMutation } from "@/app/apiAuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCred } from "@/features/authSlice";

function Login() {
  const navigate=useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [loginAdmin] = useLoginAdminMutation();
  const dispatch=useDispatch();
  const onSubmit = async (data) => {
    try {
      const result = await loginAdmin(data).unwrap();
      
      if(result?.success){
      
        dispatch(setCred({accessToken:result.accessToken}));
        

        navigate('/');
      }
      
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 w-full min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="">
        <Card className=" w-full sm:w-96 md:w-[30rem] lg:w-[32rem]">
          <CardHeader>
            <CardTitle>Login to Admin.</CardTitle>
            <CardDescription>
              Welcome! Please signin to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action=""
              className="flex flex-col gap-3 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label>Email:</Label>
                <Input
                  type="email"
                  name="email"
                  {...register("phoneOrEmail")}
                />
              </div>

              <div>
                <Label>Password:</Label>
                <Input
                  type="Password"
                  name="password"
                  {...register("password")}
                />
              </div>

              <Button type="submit" className="w-full bg-green-500 mt-2">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
