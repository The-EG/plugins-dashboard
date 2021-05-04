import React from 'react';
import Helmet from 'react-helmet';

import  { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';

import { lightTheme, darkTheme, discoranged } from '../themes';
import { withStyles } from '@material-ui/core/styles';

import MainAppBar from '../components/main-bar';
import PluginTile from '../components/plugin-tile';

import config from '../../plugins-dashboard-config.json'

import 'fontsource-roboto';

const styles = theme => ({
  tile: {
    marginLeft: "2px",
    marginRight: "2px",
    marginTop: "5px",
    marginBottom: "5px",
    minWidth: "600px",
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
    };

    this.themes = {
      light: lightTheme,
      dark: darkTheme,
      discoranged: discoranged,
    };
  }

  updateTheme(theme) {
    this.setState({
      theme: theme
    });
  }

  render() {
    const { classes } = this.props
    return (
      <main>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <title>{ config.gitHubUser }'s OctoPrint Plugins Dashboard</title>
        </Helmet>
        <ThemeProvider theme={ this.themes[this.state.theme] }>
          <CssBaseline />
          <MainAppBar updateTheme={(theme) => this.updateTheme(theme) } position="sticky"/>
          <Grid container justify="center" alignItems="center" direction="column">
          { config.plugins.map( (plugin, index) => 
            <Grid item key={index} className={classes.tile} >
              <PluginTile plugin={plugin} />
            </Grid>
          )}
          </Grid>
        </ThemeProvider>
      </main>
    );
  }
}

export default withStyles(styles)(Home);
