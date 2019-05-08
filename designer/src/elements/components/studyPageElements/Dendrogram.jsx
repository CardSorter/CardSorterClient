// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

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
    const cluserWidth = width - 100;
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
          return 'M' + (cluserWidth -
            cluserWidth * (d.data.distance/100)) + ',' + d.x
                  + 'L' + (cluserWidth -
                    cluserWidth * (d.parent.data.distance/100)) + ',' + d.x
                  + 'L' + (cluserWidth -
                    cluserWidth * (d.parent.data.distance/100))
                    + ',' + d.parent.x;
        })
        .attr('stroke-width', function(d) {
          return d.data.hierarchy +'px';
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

};

export default Dendrogram;


