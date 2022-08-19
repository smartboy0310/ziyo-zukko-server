require('dotenv').config();
const model = require('./model');
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
	GET: async (req, res) => {
		try {
			const { search_data } = req.params;
			if (search_data) {
				res.json({
					status: 200,
					data: {
						uz: await model.SEARCH_POST(`%${search_data}%`),
						ru: await model.SEARCH_POST_RU(`%${search_data}%`),
					},
				});
			} else {
				res.json({
					status: 200,
					data: {
						uz: await model.ALL_POST(),
						ru: await model.ALL_POST_RU(),
					},
				});
			}
		} catch (error) {
			res.json({
				status: 500,
				message: error.message,
			});
		}
	},

	POST: async (req, res) => {
		try {
			const { lang } = req.params;
			const uploadPhoto = req.files;
			const {
				post_name,
				post_title,
				post_discription,
				add_link_title, 
				add_link_url,
				post_video_one,
				post_video_two,
				post_video_three,
				post_type,
				post_created_by,
				post_status,
			} = req.body;

			const post_img_name = [];
			const post_img = [];
         
			uploadPhoto?.forEach((e) => {
				post_img.push(
					`${process.env.BACKEND_URL}/${uploadPhoto.filename}`,
				);
				post_img_name.push(uploadPhoto.filename);
			});

			const video_one = post_video_one ? post_video_one : null;
			const video_two = post_video_two ? post_video_two : null;
			const video_three = post_video_three ? post_video_three : null;
			const link_title = add_link_title ? add_link_title : null;
			const link_url = add_link_url ? add_link_url : null;

			if (lang == 'uz') {
				const addPost = await model.ADD_POST(
					post_name,
					post_title,
					post_discription,
					post_img,
					post_img_name,
					link_title,
					link_url,
					video_one,
					video_two,
					video_three,
					post_type,
					post_created_by,
					post_status,
				);

				if (addPost) {
					res.json({
						status: 200,
						message: 'Post Upcreated',
					});
				} else {
					res.json({
						status: 500,
						message: 'Post UnUpcreated',
					});
				}
			}

			if (lang == 'ru') {
				const addPost = await model.ADD_POST_RU(
					post_name,
					post_title,
					post_discription,
					post_img,
					post_img_name,
					link_title,
					link_url,
					video_one,
					video_two,
					video_three,
					post_type,
					post_created_by,
					post_status,
				);

				if (addPost) {
					res.json({
						status: 200,
						message: 'Photo Upcreated',
					});
				} else {
					res.json({
						status: 500,
						message: 'Photo UnUpcreated',
					});
				}
			}
		} catch (err) {
			res.json({
				status: 500,
				message: err.message,
			});
		}
	},

	PUT: async (req, res) => {
		try {
			const { lang } = req.params;
			const uploadPhoto = req.file;
			const {
				post_id,
				post_name,
				post_title,
				post_discription,
				add_link_title, 
				add_link_url,
				post_video_one,
				post_video_two,
				post_video_three,
				post_type,
				post_created_by,
				post_status,
			} = req.body;

			const post_img_name = [];
			const post_img = [];

			const video_one = post_video_one ? post_video_one : null;
			const video_two = post_video_two ? post_video_two : null;
			const video_three = post_video_three ? post_video_three : null;
			const link_title = add_link_title ? add_link_title : null;
			const link_url = add_link_url ? add_link_url : null;

			let selectedPost = {};

			if (lang == 'uz') {
				selectedPost = await model.SELECTED_POST(post_id);
			}

			if (lang == 'ru') {
				selectedPost = await model.SELECTED_POST_RU(post_id);
			}

			if (uploadPhoto.length) {
				selectedPost?.post_img_name.forEach((e) => {
					new FS(
						path.resolve(
							__dirname,
							'..',
							'..',
							'..',
							'public',
							'images',
							`${e}`,
						),
					).delete();
				});
				uploadPhoto?.forEach((e) => {
					post_img.push(
						`${process.env.BACKEND_URL}/${uploadPhoto.filename}`,
					);
					post_img_name.push(uploadPhoto.filename);
				});
			} else {
				selectedPost?.post_img.forEach((e) => {
					post_img.push(e);
				});
				selectedPost?.post_img_name.forEach((e) => {
					post_img_name.push(e);
				});
			}

			if (lang == 'uz') {
				const updatePost = await model.UPDATE_POST(
					post_id,
					post_name,
					post_title,
					post_discription,
					post_img,
					post_img_name,
					link_title,
					link_url,
					video_one,
					video_two,
					video_three,
					post_type,
					post_created_by,
					post_status,
				);

				if (updatePost) {
					res.json({
						status: 200,
						message: 'Post update',
					});
				} else {
					res.json({
						status: 500,
						message: 'Post Unupdate',
					});
				}
			}

			if (lang == 'ru') {
				const updatePost = await model.UPDATE_POST_RU(
					post_id,
					post_name,
					post_title,
					post_discription,
					post_img,
					post_img_name,
					link_title,
					link_url,
					video_one,
					video_two,
					video_three,
					post_type,
					post_created_by,
					post_status,
				);

				if (updatePost) {
					res.json({
						status: 200,
						message: 'Post update',
					});
				} else {
					res.json({
						status: 500,
						message: 'Post Unupdate',
					});
				}
			}
		} catch (err) {
			res.json({
				status: 500,
				message: err.message,
			});
		}
	},

	STATUS_EDIT: async (req, res) => {
		try {
			const { lang } = req.params;
			const { post_id, post_status } = req.body;

			if (lang == 'uz') {
				const editPost = await model.EDIT_STATUS(post_id, post_status);

				if (editPost) {
					res.json({
						status: 200,
						message: 'Post edited',
					});
				} else {
					res.json({
						status: 500,
						message: 'Post Unedited',
					});
				}
			}

			if (lang == 'ru') {
				const editPost = await model.EDIT_STATUS_RU(
					post_id,
					post_status,
				);

				if (editPost) {
					res.json({
						status: 200,
						message: 'Post edited',
					});
				} else {
					res.json({
						status: 500,
						message: 'Post Unedited',
					});
				}
			}
		} catch (err) {
			res.json({
				status: 500,
				message: err.message,
			});
		}
	},

	DELETE: async (req, res) => {
		try {
			const { lang } = req.params;
			const { post_id } = req.body;

			if (lang == 'uz') {
				const deletePost = await model.DELETE_POST(post_id);

				if (deletePost) {
					res.json({
						status: 200,
						message: 'Post deleted',
					});
				} else {
					res.json({
						status: 500,
						message: 'Post Undeleted',
					});
				}
			}

			if (lang == 'ru') {
				const deletePost = await model.DELETE_POST_RU(post_id);

				if (deletePost) {
					res.json({
						status: 200,
						message: 'Post deleted',
					});
				} else {
					res.json({
						status: 500,
						message: 'Post Undeleted',
					});
				}
			}
		} catch (err) {
			res.json({
				status: 500,
				message: err.message,
			});
		}
	},
};
