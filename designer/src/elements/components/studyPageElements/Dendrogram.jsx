// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

/**
 * Maps the distance & the hierarchical y of the cluster to the graph
 * @param {Number} distance
 * @param {Number} realY
 * @param {Number} cluserWidth
 * @return {Number} [0-100]
 */
function mapY(distance, realY, cluserWidth) {
  const distanceY = cluserWidth - cluserWidth * (distance/100);
  return distanceY * 0.8 + realY * 0.2;
}

/**
 *
 */
class Dendrogram extends Component {
  /**
   *
   */
  componentDidMount() {
    const {data, fetching} = this.props;
    if (fetching) {
      return;
    }

    // set the dimensions and margins of the graph
    const width = window.innerWidth - 100;
    const height = window.innerHeight;

    // append the svg object to the body of the page
    const svg = d3.select('#data')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(40,0)'); // bit of margin on the left = 40

    // Create the cluster layout:
    // 100 is the margin I will have on the right side
    const cluserWidth = width - 200;
    const cluster = d3.cluster()
        .size([height, cluserWidth]);

    // Give the data to this cluster layout:
    const root = d3.hierarchy(data, function(d) {
      return d.children;
    });

    cluster(root);

    // Add the links between nodes:
    svg.selectAll('path')
        .data(root.descendants().slice(1))
        .enter()
        .append('path')
        .attr('d', function(d) {
          const line = 'M' + mapY(d.data.distance, d.y, cluserWidth) + ',' + d.x
                  + 'L' + mapY(d.parent.data.distance, d.parent.y, cluserWidth)
                  + ',' + d.x
                  + 'L' + mapY(d.parent.data.distance, d.parent.y, cluserWidth)
                  + ',' + d.parent.x;
          return line;
        })
        .attr('stroke-width', function(d) {
          return (d.data.hierarchy * 1.2) + 'px';
        })
        .attr('class', 'link');

    // Customize the nodes:
    const node = svg.selectAll('node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', function(d) {
          return 'node' + (d.children ? ' node--internal' : ' node--leaf');
        })
        .attr('transform', function(d) {
          return 'translate(' + d.y + ',' + d.x + ')';
        });

    node.append('circle')
        .attr('r', function(d) {
          return d.data.children.length === 0 ? 3 * d.data.hierarchy : 0;
        });

    node.append('text')
        .attr('dy', 3)
        .attr('x', -8)
        .style('text-anchor', 'end')
        .style('transform', 'scaleX(-1)')
        .text(function(d) {
          return d.data.name;
        });
  }

  /**
   * @return {ReactDOM}
   */
  render() {
    return (
      <div className="dendrogram">
        <div id="aggreement-axis">
          <p>100% aggreement</p>
          <p>0%</p>
        </div>
        <div className="" id="data"></div>
      </div>
    );
  }
};

Dendrogram.propTypes = {
  data: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
};

export default Dendrogram;


