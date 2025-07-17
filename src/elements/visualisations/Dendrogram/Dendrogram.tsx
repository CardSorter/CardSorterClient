import React, {useEffect} from 'react';
import * as d3 from 'd3';

interface DendrogramProps {
  data: any;
  fetching: boolean | undefined;
}

interface NodeData {
  data: {
    distance: number;
    hierarchy: number;
    name: string;
    children?: NodeData[];
  };
  x: number;
  y: number;
  parent: NodeData;
  children?: NodeData[];
}

/**
 * Maps the distance & the hierarchical y of the cluster to the graph
 * @param {number} distance
 * @param {number} realY
 * @param {number} clusterWidth
 * @return {number} [0-100]
 */
function mapY(distance: number, realY: number, clusterWidth: number): number {
  const distanceY = clusterWidth - clusterWidth * (distance / 100);
  return distanceY * 0.8 + realY * 0.2;
}

const Dendrogram: React.FC<DendrogramProps> = ({data, fetching}) => {
  useEffect(() => {
    if (fetching || !data) {
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
    const clusterWidth = width - 250;
    const cluster = d3.cluster().size([height, clusterWidth]);

    // Give the data to this cluster layout:
    const root = d3.hierarchy(data, function (d: any) {
      return d.children;
    });

    cluster(root);

    // TODO: Fix ts-ignores here
    // Add the links between nodes:
    svg.selectAll('path')
      .data(root.descendants().slice(1))
      .enter()
      .append('path')
      //@ts-ignore
      .attr('d', function (d: NodeData) {
        const line = 'M' + mapY(d.data.distance, d.y, clusterWidth) + ',' + d.x
          + 'L' + mapY(d.parent.data.distance, d.parent.y, clusterWidth)
          + ',' + d.x
          + 'L' + mapY(d.parent.data.distance, d.parent.y, clusterWidth)
          + ',' + d.parent.x;
        return line;
      })
      //@ts-ignore
      .attr('stroke-width', function (d: NodeData) {
        return (d.data.hierarchy * 1.2) + 'px';
      })
      .attr('class', 'link');

    // Customize the nodes:
    const node = svg.selectAll('node')
      .data(root.descendants())
      .enter()
      .append('g')
      //@ts-ignore
      .attr('class', function (d: NodeData) {
        return 'node' + (d.children ? ' node--internal' : ' node--leaf');
      })
      //@ts-ignore
      .attr('transform', function (d: NodeData) {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    node.append('circle')
      //@ts-ignore
      .attr('r', function (d: NodeData) {
        return d.data.children?.length === 0 ? 3 * d.data.hierarchy : 0;
      });

    node.append('text')
      .attr('dy', 3)
      .attr('x', -8)
      .style('text-anchor', 'end')
      .style('transform', 'scaleX(-1)')
      //@ts-ignore
      .text(function (d: NodeData) {
        return d.data.name?.toLowerCase();
      });

    return () => {
      d3.select('#data').select('svg').remove();
    };
  }, [data, fetching]);

  return (
    <div className="dendrogram">
      <div id="agreement-axis">
        <p>100% agreement</p>
        <p>0%</p>
      </div>
      <div className="" id="data"></div>
    </div>
  );
};

export default Dendrogram;


