import React, { useEffect, useState } from 'react';
import { 
    Typography,
    Avatar,
    CardContent,
    CardHeader,
    Card,
    Grid,
    Container,
    Link,
    Box 
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import LinkButton from 'src/components/Button/LinkButton';
import SeactionHeader from './SectionHeader';
import { getLoanTypes } from 'src/store/api/loan-type';
import { useSelector, useDispatch } from 'react-redux';


const CardStyle = styled(Card)(({ theme }) => ({
    border:'1px solid '+ alpha(theme.palette.primary.main, 0.25),
    display: 'flex',
    boxShadow: "0 0 1px 0 rgb(145 158 171 / 24%), 0 0px 16px -4px rgb(145 158 171 / 24%)",
    '&:hover': {
        boxShadow: "0 0 1px 0 rgb(145 158 171 / 24%), 0 10px 30px -4px rgb(145 158 171 / 24%)",
    }
}));

const AvatarBoxStyle = styled(Box)(({ theme }) => ({
    display: 'flex', 
    flexDirection: 'column',
    // margin: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    borderRight:'1px solid '+ alpha(theme.palette.primary.main, 0.25) 
}));


export default function ServiceCard() {
    const dispatch = useDispatch();
	// const [loanService, setLoanService] = useState('');

    const { loanTypes } = useSelector((state) => ({ ...state.loanType }));

    useEffect(() => {  
        dispatch(getLoanTypes({}))
    },[])

  return (
    <Container maxWidth="lg">
        <SeactionHeader header="Loans for your life" />
        <Grid container spacing={4}>
            {loanTypes.data && loanTypes.data.map((service) => (
                <Grid item md={4} sm={6} key={service.id}>
                    <CardStyle >
                        <AvatarBoxStyle>                        
                            {/* <Avatar 
                                sx={{ bgcolor: red[500], margin: 'auto' }} 
                                aria-label={service.name}>
                                {service.name}
                            </Avatar> */}
                            <img src={service.media} style={{margin:'auto', width:'100px'}} />
                        </AvatarBoxStyle>
                        <Box>
                            <CardHeader
                                title={service.name}
                            />
                            <CardContent sx={{ paddingTop:'15px' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {service.detail}
                                </Typography>
                                <LinkButton 
                                    to={"loan/" + service.slug}
                                    style={{marginTop: '20px', fontWeight: 500}}
                                >Check Eligibility</LinkButton>
                            </CardContent>
                        </Box>
                    </CardStyle>
                </Grid>
            ))}
        </Grid>
    </Container>    
  );
}
