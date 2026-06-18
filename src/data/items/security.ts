import type { Item } from '@/types'

export const SECURITY: Item[] = [
  { id: 'hash', name: 'Hash', emoji: '#️⃣', category: 'security', rarity: 'uncommon', description: 'A fixed-size fingerprint computed from data by a one-way function.' },
  { id: 'key', name: 'Key', emoji: '🔑', category: 'security', rarity: 'uncommon', description: 'A secret value used to encrypt or decrypt data.' },
  { id: 'cipher', name: 'Cipher', emoji: '🗝️', category: 'security', rarity: 'uncommon', description: 'An algorithm that transforms readable text into an unreadable form and back.' },
  { id: 'encryption', name: 'Encryption', emoji: '🔐', category: 'security', rarity: 'rare', description: 'The process of encoding data so that only those with the right key can read it.' },
  { id: 'public-key', name: 'Public-Key Crypto', emoji: '🔓', category: 'security', rarity: 'rare', milestone: '1976', description: 'Asymmetric cryptography using a public key to encrypt and a private key to decrypt.' },
  { id: 'hash-collision', name: 'Hash Collision', emoji: '💢', category: 'security', rarity: 'epic', description: 'When two different inputs produce the same hash — a weakness attackers can exploit.' },
  { id: 'password', name: 'Password', emoji: '🪪', category: 'security', rarity: 'uncommon', description: 'A secret string a user supplies to prove their identity.' },
  { id: 'authentication', name: 'Authentication', emoji: '🛂', category: 'security', rarity: 'rare', description: 'The process of verifying that someone or something is who they claim to be.' },
  { id: 'firewall', name: 'Firewall', emoji: '🚒', category: 'security', rarity: 'rare', description: 'A barrier that filters network traffic according to security rules.' },
  { id: 'tls', name: 'TLS', emoji: '🛡️', category: 'security', rarity: 'rare', description: 'The protocol that encrypts traffic between clients and servers, securing the modern web.' },
  { id: 'vpn', name: 'VPN', emoji: '🕵️', category: 'security', rarity: 'rare', description: 'An encrypted tunnel that routes traffic privately across an untrusted network.' },
  { id: 'exploit', name: 'Exploit', emoji: '🐞', category: 'security', rarity: 'rare', description: 'Code that takes advantage of a bug or vulnerability to make a system misbehave.' },
  { id: 'malware', name: 'Malware', emoji: '🦠', category: 'security', rarity: 'epic', description: 'Malicious software designed to damage, disrupt, or gain unauthorized access to a system.' },
  { id: 'blockchain', name: 'Blockchain', emoji: '🧊', category: 'security', rarity: 'epic', milestone: '2008', description: 'A tamper-evident ledger of records cryptographically chained together by their hashes.' },
  { id: 'digital-signature', name: 'Digital Signature', emoji: '✍️', category: 'security', rarity: 'epic', description: 'A cryptographic proof that a message came from a specific sender and was not altered.' },
  { id: 'spectre-meltdown', name: 'Spectre / Meltdown', emoji: '👻', category: 'security', rarity: 'legendary', milestone: '2018', description: 'A family of hardware vulnerabilities that abuse speculative execution to leak data across security boundaries.' },
  { id: 'rowhammer', name: 'Rowhammer', emoji: '🔨', category: 'security', rarity: 'epic', milestone: '2014', description: 'An attack that flips bits in DRAM by rapidly hammering nearby memory rows.' },
  { id: 'tee', name: 'Trusted Execution Environment', emoji: '🔐', category: 'security', rarity: 'epic', description: 'An isolated, secure region of a processor where code and data stay confidential even if the OS is compromised.' },
  { id: 'tpm', name: 'Trusted Platform Module', emoji: '🔒', category: 'security', rarity: 'epic', description: 'A dedicated hardware chip that securely generates and stores cryptographic keys for a device.' },
  { id: 'secure-boot', name: 'Secure Boot', emoji: '🥾', category: 'security', rarity: 'epic', description: "A boot process that verifies each stage's signature, refusing to run software that has been tampered with." },
]
