import Cors from 'cors';

const allowedOrigins = ['https://osu.in.th', 'https://xn--73cf8ayb.xn--o3cw4h'];

export default Cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET'],
  optionsSuccessStatus: 200,
});