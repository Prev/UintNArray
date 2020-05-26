# Converter

To convert `ssd_mobilenet_v2_coco` frozen model to tensorflowjs model, use command below:

```bash
tensorflowjs_converter --input_format=tf_frozen_model \
	--output_format=tfjs_graph_model \
	--output_node_names='Postprocessor/ExpandDims_1,Postprocessor/Slice' \
	--quantization_bytes=2 \
	ssd_mobilenet_v2_coco/frozen_inference_graph.pb \
	coco_q2

```