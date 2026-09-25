import { Component } from 'react'

export default class SpatialErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.warn('Spatial scene failed; using fallback.', error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
