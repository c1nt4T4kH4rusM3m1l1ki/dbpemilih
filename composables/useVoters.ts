import { ref } from 'vue'

// Buat state global
const voters = ref([])

export const useVoters = () => {
  const fetchVoters = async () => {
    try {
      const response = await fetch('/api/dashboard/voters')
      const data = await response.json()
      voters.value = data
    } catch (error) {
      console.error('Error fetching voters:', error)
    }
  }

  return {
    voters,
    fetchVoters
  }
} 