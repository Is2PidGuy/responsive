import React from 'react';
import {
    select,
    scaleBand,
    scaleLinear,
} from 'd3';

// hoc that wraps a component inside another component with lifecycle
// events
function Responsive(Component) {
    return class extends React.Component {
        constructor() {
            super();
            this.state = { width: undefined, height: undefined };
            this.resize = this.resize.bind(this);
        }

        componentDidMount() {
            window.addEventListener('resize', this.resize);
            this.resize();
        }

        resize() {
            const node = this.node;
            const bounds = node.getBoundingClientRect();
            const width = bounds.width;
            const height = bounds.height;
            this.setState({ width, height });
        }

        componentWillMount() {
            window.removeEventListener('resize', this.resize);
        }

        render() {
            const { width, height } = this.state;
            const { props } = this;
            return (
                <div
                    style={{ width: '100%', height: '100%' }}
                    ref={node => this.node = node}
                >
                    {
                        width && <Component
                            width={width}
                            height={height}
                            {...props}
                        />
                    }
                </div>
            );
        }
    }
}

class BarChart extends React.Component {
    constructor() {
        super();
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.draw();
    }

    draw() {
        const node = select(this.node);
        const {
            width: w,
            height: h,
            data,
        } = this.props;

        const xscale = scaleBand();
        xscale.domain(data.map(d => d.year));
        xscale.padding(0.2);
        xscale.range([0, w]);

        const yscale = scaleLinear();
        yscale.domain([0, 100]);
        yscale.range([0, h]);
        const upd = node.selectAll('rect').data(data);
        upd.enter()
            .append('rect')
            .merge(upd)
            .attr('x', d => xscale(d.year))
            .attr('y', d => h - yscale(d.percent))
            .attr('width', xscale.bandwidth())
            .attr('height', d => yscale(d.percent))
            .attr('fill', 'black');
    }

    componentDidUpdate() {
        this.draw();
    }


    render() {
        //make svg stretch fully in width and height of parent node
        return (
            <svg
                style={{ width: '100%', height: '100%' }}
                ref={node => {
                    this.node = node;
                }}
            >
            </svg>
        );
    }
}

export default Responsive(BarChart);

