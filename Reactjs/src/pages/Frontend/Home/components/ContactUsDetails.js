import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { alpha, styled } from '@mui/material/styles';
// import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
// import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
// import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
// import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import Iconify from 'src/components/Iconify';


const IconifyStyle = styled(Iconify)(({ theme }) => ({
    // backgroundColor: alpha(theme.palette.primary.main, 0.10),
    // borderRadius:'50%',
    // padding:15,
    color: alpha(theme.palette.primary.main, 1),
    fontSize:40
}));


export default function ContactUsDetails() {
  const contacts = [
    {
      title : "Location",
      detail: "22 Baker Street, London, United Kingdom, W1U 3BW",
      image : <IconifyStyle icon="carbon:location"/>
    },
    {
      title : "Make A Call",
      detail: "+44-20-7328-4499",
      image : <IconifyStyle icon="cil:phone"/>
    },
    {
      title : "Send A Mail",
      detail: "info@yourdomain.com",
      image : <IconifyStyle icon="fluent:mail-20-regular"/>
    },
  ]

  return (
    <Card>
      <CardContent>
        <List sx={{ width: '100%' }}>
          {contacts.map((contact, i) => (
            <div key={i}>
            <ListItem style={{marginTop:15 , marginBottom:15}} 
               alignItems="flex-start"
            >
              <ListItemAvatar>
                {contact.image}
              </ListItemAvatar>
              <ListItemText
                primary={
                <Typography
                  sx={{ display: 'inline' }}
                  variant="h5"
                >
                  {contact.title}
                </Typography>}
                secondary={contact.detail}
              />
            </ListItem> 
            {i < 2 ? <Divider /> : ''}
             
          </div>
          ))}  
            
        </List>
      </CardContent>
    </Card>
  );
}