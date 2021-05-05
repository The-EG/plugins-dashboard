import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import config from '../../plugins-dashboard-config.json'

import repo_stats from '../../data/repos.json';

const styles = theme => ({
  paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
  },
  chartAxis: {
      stroke: "red",
  },
  card: {
    margin: "2px",
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  },
  issuesContent: {
    textAlign: 'center',
  }
});


class PluginGitHubInfo extends React.Component {
  render () {
    const { classes, plugin } = this.props;

    return (
      <Box padding={1}>
        <Grid container wrap="wrap">

          <Grid item>
              <Card className={ classes.card }>
                <CardContent>
                  <Link href={`${plugin.url}/issues/`} target="_blank" rel="noopener" >
                    <Typography variant="caption" color="textPrimary">Open Issues</Typography>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h2" align="center" color="textPrimary">{ repo_stats[plugin.id].open_issues }</Typography>
                      </Grid>
                      <Grid item xs={4} className={classes.issuesContent}>
                        <Typography variant="caption" noWrap color="textSecondary">FRs</Typography>
                        <Typography variant="h4" align="center" color="textPrimary">{ repo_stats[plugin.id].open_frs}</Typography>
                      </Grid>
                      <Grid item xs={4} className={classes.issuesContent}>
                        <Typography variant="caption" align="center" noWrap color="textSecondary">Bugs</Typography>
                        <Typography variant="h4" align="center" color="textPrimary">{ repo_stats[plugin.id].conf_bugs}</Typography>
                      </Grid>
                      <Grid item xs={4} className={classes.issuesContent}>
                        <Typography variant="caption" align="center" noWrap color="textSecondary">Need Info</Typography>
                        <Typography variant="h4" align="center" color="textPrimary">{ repo_stats[plugin.id].open_need_info}</Typography>
                      </Grid>
                    </Grid>
                  </Link>
                </CardContent>
              </Card>
            </Grid>

          <Grid item>
            <Card className={ classes.card }>
              <CardContent>
                <Typography variant="caption" color="textPrimary">Stargazers</Typography>
                <Typography variant="h4" color="textPrimary">{ repo_stats[plugin.id].stargazers }</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card className={ classes.card }>
              <CardContent>
                <Typography variant="caption" color="textPrimary">Forks</Typography>
                <Typography variant="h4" color="textPrimary">{ repo_stats[plugin.id].forks }</Typography>
              </CardContent>
            </Card>
          </Grid>

          
        </Grid>
      </Box>
    );
  }
}

PluginGitHubInfo.propTypes = { classes: PropTypes.object.isRequired, plugin: PropTypes.object.isRequired };

export default withStyles(styles, { withTheme: true })(PluginGitHubInfo);
