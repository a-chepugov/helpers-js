const amqplib = require('amqplib');

module.exports = class {
	constructor(_config = {}) {
		this._config = _config || {};
	}

	_connect() {
		const {user, password, host, port} = this._config;
		const url = `amqp://${user}:${password}@${host}:${port}`;
		return amqplib.connect(url)
			.then((connection) => {
				process.once('SIGINT', function () {
					connection.close();
				});
				connection.on('error', () => {
					connection.close();
				});
				return connection;
			})
			.then(null, console.warn);
	}

	connect() {
		return this._connection ?
			this._connection :
			this._connection = this._connect()
				.then((connection) => {
					connection.on('close', () => {
						delete this._connection;
					});
					return connection;
				});
	}

	_createChannel() {
		return this.connect()
			.then((connection) => connection.createChannel())
			.then((channel) => {
				channel.on('error', () => {
					channel.close();
				});
				return channel;
			});
	}

	createChannel() {
		return this._channel ?
			this._channel :
			this._channel = this._createChannel()
				.then((channel) => {
					channel.on('close', () => {
						delete this._channel;
					});
					return channel;
				});
	}

	prefetch(count) {
		return this.createChannel()
			.then((channel) => channel.prefetch(count));
	}

	assertQueue(queue) {
		return this.createChannel()
			.then((channel) => {
				const {name, options} = queue;
				return channel.assertQueue(name, options);
			});
	}

	sendToQueue(queue, message, options) {
		return this.assertQueue(queue)
			.then(() => this.createChannel())
			.then((channel) => {
				return channel.sendToQueue(queue.name, Buffer.from(message), options);
			});
	}

	assertExchange(exchange) {
		return this.createChannel()
			.then((channel) => {
				const {name, type, options} = exchange;
				return channel.assertExchange(name, type, options);
			});
	}

	publish(exchange, routingKey = '', message, options) {
		return this.assertExchange(exchange)
			.then(() => this.createChannel())
			.then((channel) => {
				return channel.publish(exchange.name, routingKey, Buffer.from(message), options);
			});
	}

	bindQueue(queue, exchange) {
		const promises = [this.assertQueue(queue), this.assertExchange(exchange)];
		return Promise.all(promises)
			.then(() => this.createChannel()
				.then((channel) => channel.bindQueue(queue.name, exchange.name)));
	}

	consume(queue, handler, options) {
		return this.assertQueue(queue)
			.then(() => this.createChannel())
			.then((channel) => channel.consume(queue.name, handler(channel), options));
	}
};
