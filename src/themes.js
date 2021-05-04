import { createMuiTheme } from '@material-ui/core/styles';

const defaultLightTheme = createMuiTheme({ palette: { type: 'light' }});

const defaultDarkTheme = createMuiTheme({ palette: { type: 'dark' }});

const overrideProps = {
    /*
    MuiTextField: {
        variant: 'filled'
    },
    MuiFormControl: { 
        variant: 'filled'
    }*/
};

export const lightTheme = createMuiTheme({
    palette: {
      type: 'light'
    },
    props: overrideProps,
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*::-webkit-scrollbar': {
                    width: '10px'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: defaultLightTheme.palette.primary.main,
                    borderRadius: '5px'
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: defaultLightTheme.palette.primary.light
                }
            }
        }
    }
  });

export const darkTheme = createMuiTheme({
    palette: {
      type: 'dark'
    },
    props: overrideProps,
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*::-webkit-scrollbar': {
                    width: '10px'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: defaultDarkTheme.palette.primary.main,
                    borderRadius: '5px'
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: defaultDarkTheme.palette.primary.light
                }
            }
        }
    }
  });

export const discoranged = createMuiTheme({
    palette: {
        primary: {
            main: "#FC8003", // orange
        },
        secondary: {
            main: "#13c100"
        },
        background: {
            paper: "#36393f",
            default: "#2f3136",
        },
        type: 'dark'
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*::-webkit-scrollbar': {
                    width: '10px'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: "#FC8003",
                    borderRadius: '5px'
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: "#13c100"
                }
            }
        }
    }
});