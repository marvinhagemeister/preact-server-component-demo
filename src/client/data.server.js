module.exports = {
	ServerComponent: ({ state }) => {
		return {
			J0: state
				? ["$", "h3", null, { class: "foo", children: "hello" }]
				: ["$", "p", null, { children: "This is text coming from the server" }],
		};
	},

	ServerComponent2: ({ state }) => {
		return {
			J1: state
				? ["$", "h3", null, { children: "world!" }]
				: ["$", "h3", null, { class: "foo", children: "Franzbrötchen" }],
		};
	},

	ServerComponent3: () => {
		return {
			M1: { id: "./foo.client.js", name: "Foo" },
			J2: ["$", "@M1#Foo", null, { children: "Client component!" }],
		};
	},
};
