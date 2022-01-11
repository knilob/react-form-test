import React from "react";

class DropDown extends React.Component {
    state = {
        countries: []
    }

    componentDidMount() {
        fetch('https://gist.githubusercontent.com/manishtiwari25/0fa055ee14f29ee6a7654d50af20f095/raw/83590033406f0a948207b9d6d50f68f156f80d3f/country_state.json')
            .then((res) => {
                return res.json();
            }).then((json) => {
                this.setState({
                    countries: json
                })
            });
    }

    render() {
        return <div className="mb-3 pt-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="country">Country</label>
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 text-sm py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="country" id="country">
                <option>Select Country</option>
                {
                    this.state.countries.map((country) => {
                        return <option key={country.countryCode} value={country.countryCode}>{country.name}</option>
                    })
                }
            </select>
        </div>
    }
}

export default DropDown;