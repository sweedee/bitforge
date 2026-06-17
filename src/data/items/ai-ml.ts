import type { Item } from '@/types'

export const AI_ML: Item[] = [
  { id: 'dataset', name: 'Dataset', emoji: '🗳️', category: 'ai-ml', rarity: 'uncommon', description: 'A structured collection of examples used to train or evaluate a model.' },
  { id: 'model', name: 'Model', emoji: '🤔', category: 'ai-ml', rarity: 'uncommon', description: 'A mathematical function, fitted to data, that makes predictions on new inputs.' },
  { id: 'weights', name: 'Weights', emoji: '🏋️', category: 'ai-ml', rarity: 'uncommon', description: 'The learned parameters of a model that determine how inputs map to outputs.' },
  { id: 'neuron', name: 'Neuron', emoji: '🧫', category: 'ai-ml', rarity: 'uncommon', description: 'A single computational unit that combines weighted inputs and applies an activation.' },
  { id: 'gradient-descent', name: 'Gradient Descent', emoji: '📉', category: 'ai-ml', rarity: 'rare', description: 'An optimization method that iteratively adjusts parameters to reduce error.' },
  { id: 'training', name: 'Training', emoji: '🎓', category: 'ai-ml', rarity: 'rare', description: 'The process of fitting a model to data by repeatedly adjusting its weights.' },
  { id: 'neural-network', name: 'Neural Network', emoji: '🧠', category: 'ai-ml', rarity: 'rare', milestone: '1958', description: 'A model of interconnected layers of neurons that learns patterns from data.' },
  { id: 'deep-learning', name: 'Deep Learning', emoji: '🌌', category: 'ai-ml', rarity: 'epic', milestone: '2012', description: 'Machine learning with many-layered neural networks that learn hierarchical representations.' },
  { id: 'backpropagation', name: 'Backpropagation', emoji: '🔙', category: 'ai-ml', rarity: 'epic', description: 'The algorithm that efficiently computes gradients to train deep neural networks.' },
  { id: 'cnn', name: 'Convolutional Net', emoji: '🖼️', category: 'ai-ml', rarity: 'epic', description: 'A neural network that uses convolution over grids, excelling at images.' },
  { id: 'attention', name: 'Attention', emoji: '👁️', category: 'ai-ml', rarity: 'epic', description: 'A mechanism that lets a model weigh the relevance of different parts of its input.' },
  { id: 'transformer', name: 'Transformer', emoji: '🔱', category: 'ai-ml', rarity: 'legendary', milestone: '2017', description: 'An attention-based architecture that became the backbone of modern AI.' },
  { id: 'llm', name: 'Large Language Model', emoji: '🗣️', category: 'ai-ml', rarity: 'legendary', milestone: '2020', description: 'A transformer trained on vast text that generates and reasons over natural language.' },
  { id: 'embedding', name: 'Embedding', emoji: '📐', category: 'ai-ml', rarity: 'rare', description: 'A dense numeric vector that captures the meaning of a word, item, or concept.' },
  { id: 'overfitting', name: 'Overfitting', emoji: '📛', category: 'ai-ml', rarity: 'epic', description: 'When a model memorizes its training data and fails to generalize to new inputs.' },
  { id: 'tokenizer', name: 'Tokenizer', emoji: '✂️', category: 'ai-ml', rarity: 'rare', description: 'A component that splits text into the discrete tokens a language model consumes.' },
  { id: 'reinforcement-learning', name: 'Reinforcement Learning', emoji: '🕹️', category: 'ai-ml', rarity: 'epic', description: 'Learning by trial and error, guided by rewards from interacting with an environment.' },
]
