import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: "80vw",
  },
  chartAxis: {
  },
  tooltipCard: {
  }
});

class VersionPieTooltip extends React.Component {
  render() {
    const { classes } = this.props;
    const color = this.props.versionColors[this.props.version];
    return (
      <Card variant="outlined" className={ classes.tooltipCard }>
        <CardContent>
          <Typography variant="subtitle1" style={ { color: color }} >Version: { this.props.version }</Typography>
          <Typography variant="h3" color="textPrimary">{ `${(this.props.instances / this.props.totalInstances * 100).toFixed(1)}%` }</Typography>
          <Typography variant="caption" color="textSecondary">{ `${this.props.instances} instances` }</Typography>
        </CardContent>
      </Card>
    )
  }
}

const StyledVersionPieTooltip = withStyles(styles, { withTheme: true })(VersionPieTooltip);

const RenderVersionPieTooltip = ({active, payload, label}, pluginId, total, colors) => {
  if (active && payload && payload.length) {
    return <StyledVersionPieTooltip version={payload[0].name} instances={payload[0].value} plugin={pluginId} totalInstances={total} versionColors={colors}/>
  } else {
    return null;
  }
}

class VersionPieChart extends React.Component {
  render() {
    var totalInstances = 0;
    for (var v of this.props.versionData) totalInstances += v.count;

    return (
      <ResponsiveContainer height={300} >
        <PieChart>
          <Pie data={ this.props.versionData} dataKey="count" nameKey="version">
            { this.props.versionData.map((version, index)=> (
              <Cell key={`pie-version-${index}`} fill={ this.props.versionColors[version.version] } />
            ))}
          </Pie>
          <Legend align="left" verticalAlign="middle" layout="vertical" />
          <Tooltip content={ (event) => RenderVersionPieTooltip(event, this.props.plugin.id, totalInstances, this.props.versionColors) }/>
        </PieChart>
      </ResponsiveContainer>
    )
  }
}

export default withStyles(styles, {withTheme: true})(VersionPieChart);