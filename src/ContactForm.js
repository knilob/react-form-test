import React, { useState } from "react";
import DropDown from "./components/DropDown";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/4b089630-728a-11ec-b2d5-af79f33d926c";

const ContactForm = () => {
    const [status, setStatus] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();

        const values = e.target.elements;
        const data = {};

        for (let i = 0; i < values.length; i++) {
            console.log(values[i].name, values[i].value);
            if (values[i].name) {
                data[values[i].name] = values[i].value;
            }
        }

        fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status === 422) {
                    e.target.submit();
                    throw new Error("Please finish the captcha challenge.");
                }

                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(() => setStatus("We received your submission."))
            .catch((err) => setStatus(err.toString()));
    };

    if (status) {
        return (
            <>
                <div className="text-2xl">Thank You!</div>
                <div className="text-md">{status}</div>
            </>
        );
    }

    return (
        <form
            action={FORM_ENDPOINT}
            onSubmit={handleSubmit}
            method="POST"
            target="_blank"
        >
            <div className="mb-3 pt-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">First Name</label>
                <input
                    type="text"
                    placeholder="First Name"
                    name="first-name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    placeholder="Last Name"
                    name="last-name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">Address</label>
                <input
                    type="text"
                    placeholder="Street Address"
                    name="address"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">City</label>
                <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state    ">State</label>
                <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    required
                />
            </div>
            <DropDown />
            <div className="mb-3 pt-0">
                <button
                    className="bg-black text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                >
                    Submit Contact Information
                </button>
            </div>
        </form>
    );
}

export default ContactForm;