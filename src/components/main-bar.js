import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import GitHubIcon from '@material-ui/icons/GitHub';

import { withStyles } from '@material-ui/core/styles';

import config from '../../plugins-dashboard-config.json'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  avatarButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
});

class MainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: null
    };
  }

  openMenu(anchor) {
    this.setState({
      menuAnchor: anchor
    });
  }

  closeMenu() {
    this.setState({
      menuAnchor: null
    });
  }

  setTheme(theme) {
    this.props.updateTheme(theme);
    this.closeMenu();
  }

  render() {
    const { classes } = this.props
    return (            
      <AppBar position="sticky">
        <Toolbar>
          <Avatar edge="start" className={classes.avatarButton} alt={ config.gitHubUser } src={ `https://github.com/${config.gitHubUser}.png?size=64` } />
          <Typography variant="h6" className={classes.title}>{config.gitHubUser}'s OctoPrint Plugins</Typography>
          <Tooltip title={`${config.gitHubUser} on GitHub`}>
            <Link href={`https://github.com/${config.gitHubUser}`} target="_blank" rel="noopener" >
              <IconButton  ><GitHubIcon /></IconButton>
            </Link>
          </Tooltip>
          <IconButton onClick={ (event) => this.openMenu(event.target) }><FormatPaintIcon /></IconButton>
          <Menu
            anchorEl={this.state.menuAnchor}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={ this.state.menuAnchor!=null }
            onClose={ this.closeMenu }
          >
            
            <MenuItem onClick={ () => this.setTheme('dark') }>Material Dark</MenuItem>
            <MenuItem onClick={ () => this.setTheme('discoranged') }>Discoranged</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

MainAppBar.propTypes = { classes: PropTypes.object.isRequired, updateTheme: PropTypes.func.isRequired, };

export default withStyles(styles, { withTheme: true })(MainAppBar);