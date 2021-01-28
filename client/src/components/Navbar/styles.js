import { makeStyles } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    },
    heading: {
        color: 'rgba(0, 183, 255, 1)',
        textDecoration: 'none',
        fontSize: '50px',
        textTransform: 'uppercase'
    },
    image: {
        marginLeft: '15px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '300px',
        backgroundColor: 'grey',
        borderRadius: '30px',
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
            justifyContent: 'center'
        }

    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        textTransform: 'uppercase'
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        letterSpacing: "1px",
        textTransform: 'uppercase'
    },
    brandContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },

    buttons: {
        fontWeight: '600',
    }

}))