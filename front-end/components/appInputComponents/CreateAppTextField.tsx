import { useState, ChangeEvent} from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Textarea from '@mui/joy/Textarea';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

interface Props {
  set: (setBool: boolean) => void;
}
export default function CreateAppTextField({set}: Props) {
      
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState('');
  let id: any;
  // const [output, setOutput] = useState('') ;

    //Sending Data to the chatGPT API
    const sendingData = async() => {
      // setOutput('');
      try{
        const res = await axios.post('http://localhost:8080/chat_input', {
          value: value,
          edit: edit,
          id: id
        });
        // setOutput(res.data);
        window.location.reload();
      }catch(e){
        console.error(e);
      }
      setValue('');
    }

    //User Input
  const userInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  const editUserInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEdit(e.target.value);
  }
  
  //Submit Input with 'Send' button
  const submitChat = (event: {
    currentTarget: any; preventDefault: () => void; 
  }) => {
    event.preventDefault();
    id = event.currentTarget.id;
    set(true);
    sendingData();
  }

  //Render the Chat Box
  return (
    <div>
      <Stack 
    direction='column'
    spacing={1}
    >
      <Box
      sx={{
        py: 2,
        display: 'grid',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
    <form 
      id='new'
      onSubmit={submitChat}>
      <Stack 
       direction="row"
       spacing={1}
       >
       <Textarea
        name="Outlined" 
        placeholder="Create an App" 
        variant="outlined" 
        onChange={userInput} 
        value={value} 
        sx={{width: 500}} 
      />
      <Button 
        variant="contained" 
        type='submit' 
        sx={{height: 43}}
        >
      <SendIcon fontSize="small" />
      </Button>
      </Stack>
    </form>
    </Box>
    </Stack>

    <form 
      id='edit'
      onSubmit={submitChat}>
      <Stack 
       direction="row"
       spacing={1}
       sx={{
        position: 'fixed',
        bottom: 80,
        right: 80
       }}
       >
       <Textarea
        name="Outlined" 
        placeholder="Edit App" 
        variant="outlined" 
        onChange={editUserInput} 
        value={edit} 
        sx={{width: 300}} 
        
      />
      <Button 
        variant="contained" 
        type='submit' 
        sx={{height: 43}}
        >
      <SendIcon fontSize="small" />
      </Button>
      </Stack>
    </form>
    
    </div>
    
  ) 
}

