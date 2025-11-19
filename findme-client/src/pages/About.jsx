import React from "react"

const About = () => {
return (
	<div className="mx-auto mt-5">
	<div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
		<h1 className="text-3xl md:text-4xl font-bold mb-6">About Our Finders App</h1>
		
		<div className="space-y-8">
		<section>
			<h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
			<p className="text-gray-700 mb-4">
			FindMe is dedicated to helping families and communities locate missing loved ones 
			through technology, collaboration, and compassion. We believe that everyone missing deserves 
			to be found and that technology can play a crucial role in reuniting people.
			</p>
		</section>

		<section>
			<h2 className="text-2xl font-semibold mb-4">What We Do</h2>
			<div className="grid md:grid-cols-2 gap-6 mb-6">
			<div className="bg-blue-50 p-6 rounded-lg">
				<h3 className="text-xl font-semibold mb-3 text-blue-800">Report Missing Persons</h3>
				<p className="text-gray-700">
				Our secure platform allows you to quickly and efficiently report missing persons 
				with all the necessary details to aid in the search.
				</p>
			</div>
			
			<div className="bg-green-50 p-6 rounded-lg">
				<h3 className="text-xl font-semibold mb-3 text-green-800">Community Search</h3>
				<p className="text-gray-700">
				Leverage the power of community by sharing information and collaborating 
				with others to help locate missing individuals.
				</p>
			</div>
			</div>
		</section>

		<section>
			<h2 className="text-2xl font-semibold mb-4">How It Works</h2>
			<ol className="list-decimal list-inside space-y-3 text-gray-700">
			<li className="pb-2">
				<strong>Report:</strong> Fill out our comprehensive form with details about the missing person
			</li>
			<li className="pb-2">
				<strong>Verify:</strong> Our team reviews and verifies the information
			</li>
			<li className="pb-2">
				<strong>Share:</strong> The case is shared with our community and relevant authorities
			</li>
			<li className="pb-2">
				<strong>Search:</strong> Community members can help by sharing information and keeping watch
			</li>
			<li className="pb-2">
				<strong>Update:</strong> Regular updates are provided as new information becomes available
			</li>
			</ol>
		</section>

		<section className="bg-gray-50 p-6 rounded-lg">
			<h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
			<p className="text-gray-700 mb-4">
			If this is an emergency or you have immediate information about a missing person, 
			please contact local authorities immediately:
			</p>
			<div className="grid md:grid-cols-2 gap-4 text-sm">
			<div>
				<strong>Police Emergency:</strong> 911 (KE) or your local emergency number
			</div>
			<div>
				<strong>National Center for Missing & Exploited Children:</strong> 1--THE-LOST
			</div>
			</div>
		</section>
		</div>
	</div>
	</div>
)
}

export default About