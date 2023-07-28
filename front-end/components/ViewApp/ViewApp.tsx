import "highlight.js/styles/vs2015.css";
import "highlight.js";
import "katex/dist/katex.css";
import "react-quill/dist/quill.snow.css";

import { AxiosResponse } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { isString } from "lodash";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import Stack from '@mui/material/Stack';
import { App} from "../types";
import WithTableStyles from "./WithTableStyles";
import api from "../../pages/api/axios";
import ViewAppOutputs from "./ViewAppOutputs";
import { getInitialValues, parseInvalidJson } from "./common";
import ViewAppHeader from "./ViewAppHeader";
import ViewAppInputs from "./ViewAppInputs";
import { Button, CircularProgress } from "@mui/material";
import CreateAppTextField from "../appInputComponents/CreateAppTextField";
import { Height } from "@mui/icons-material";

interface Values {
  [value: string]: any;
}
interface Props {
  app: App;
  // set: (setBool: boolean) => void;
}
export default function ViewApp({ app }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<any>();
  const appOutputsRef = useRef<HTMLElement>(null);
  const [bool, setBool] = useState(false);
  const [loading, setLoading] = useState(false);
  const { input_inputs, app_id } = app;

  const handleSubmit = async (inputs: Values, {}: FormikHelpers<Values>) => {
    try {
      var {
        data,
        ...rest
      }: AxiosResponse<{ outputs: Values; stdout: string; error: string }> =
        await api.post(`/app/${app_id}`, inputs);
      if (isString(data)) {
        // axios failed to parse JSON response
        data = parseInvalidJson(data, (e) => {
          enqueueSnackbar(`Unexpected output values`, {
            variant: "error",
          });
        });
      }
      setData(data); // Set outputs to be used by the `outputs` page
    } catch (e: any) {
      setData(e.response.data);
      enqueueSnackbar("An unexpected error occurred while running the app", {
        variant: "error",
      });
    } finally {
      // Need setTimeout to allow time to load outputs, otherwise will scroll halfway
      !!appOutputsRef.current &&
        setTimeout(() =>
          appOutputsRef.current!.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        );
    }
  };
  const initialValues = getInitialValues(input_inputs);


  const setLoad = (bools: boolean | ((prevState: boolean) => boolean)) => {
    setBool(bools)
    setLoading(true);
  }

  if(loading){
    return (
      <div style={{
         display: 'flex', 
         gap: 2, 
         alignItems: 'center', 
         flexWrap: 'wrap',
         justifyContent: 'center',
         height: '80vh'
         }}>
        <CircularProgress size={50} />
      </div>
    )
  }else{
    return (
      <div>
        <Stack 
    direction='column'
    spacing={3}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
     }}
     >
      <CreateAppTextField set = {setLoad}/>

      <WithTableStyles maxWidth="md">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, isValid }) => (
            <>
              <ViewAppHeader app={app} />
              <Form>
                <ViewAppInputs app={app} />
                <Button
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting || !isValid}
                  type="submit"
                >
                  {!!isSubmitting ? <CircularProgress size={20} /> : "Submit"}
                </Button>
              </Form>
              <ViewAppOutputs app={app} data={data} innerRef={appOutputsRef} />
            </>
          )}
        </Formik>
      </WithTableStyles>
    </Stack>
    {/* <EditAppTextField/> */}
      </div>
      
    )
  }
}
