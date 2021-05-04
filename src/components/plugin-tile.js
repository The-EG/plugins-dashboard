import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import VersionPieChart from '../components/plugin-version-pie';
import PluginGitHubInfo from '../components/plugin-github';
import VersionLineChart from '../components/plugin-version-line';

import pluginData from '../../data/stats.json';


var versionPercHist = {};

for (var p in pluginData){
  versionPercHist[p] = [];
  for (var d of pluginData[p].history) {
    var versions = {};
    for (var v in d.versions) versions[v] = d.versions[v].instances / d.total;
    versions['date'] = d.date;
    versions['total'] = d.total;
    versionPercHist[p].push(versions);
  }
}

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "80vw",
  },
  chartAxis: {
  },
  tooltipCard: {
  },
  card: {
    margin: "2px",
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  },
});

class PluginTile extends React.Component {
  render() {
    const { classes, theme } = this.props;
    const baseColors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main
    ];

    var versionData = [];
    var versionColors = {};
    
    for (var v in pluginData[this.props.plugin.id].versions) {
      versionData.push({version: v, count: pluginData[this.props.plugin.id].versions[v].instances});
    }

    for (var i in versionData) {
      var ci = i % baseColors.length;
      versionColors[versionData[i].version] = baseColors[ci];
    }

    return (
      <Paper className={classes.paper} >
        <Typography variant="h4">{ this.props.plugin.name }</Typography>
        <Grid container direction="row" justify="space-evenly" wrap="wrap" alignItems="flex-start">
          <Grid item xs={12} lg={2}>
              <Typography>Instances</Typography>
              <Typography variant="h2">{ pluginData[this.props.plugin.id].total }</Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography>Instances by Version (30 days)</Typography>
            <VersionPieChart versionData={ versionData } versionColors={ versionColors } plugin={ this.props.plugin} />            
          </Grid>
          <Grid item xs={12} lg={4}>
            <Typography>Version History</Typography>
            <VersionLineChart versionData={ versionData } versionColors={ versionColors } plugin={ this.props.plugin} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography>GitHub Info</Typography>
            <PluginGitHubInfo plugin={ this.props.plugin } />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

PluginTile.propTypes = { classes: PropTypes.object.isRequired, plugin: PropTypes.object.isRequired };

export default withStyles(styles, { withTheme: true })(PluginTile);