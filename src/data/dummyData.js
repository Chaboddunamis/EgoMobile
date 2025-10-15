const dummyData = {
  creators: [
    {
      id: 'c1',
      name: 'Ugonnaya Willams',
      age: 28,
      country: 'Nigeria',
      nationality: '🇳🇬',
      bio: 'The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.',
      profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400',
      bookmarks: 19200000, // 19.2M
      downloads: 241,
      earnings: 59240, // $59.24K
      liveViewers: 49300, // 49.3K
      totalViews: 100320000, // 100.32M
      verified: true,
      approvalStatus: 'approved',
      genderVerified: true,
      currentAuction: 'Exclusive Fashion Consultation',
      currentBid: 2500,
      timeLeft: '2h 15m',
      images: [
        { url: 'https://picsum.photos/400/600?random=1', likes: 15800, views: 1200000 },
        { url: 'https://picsum.photos/400/600?random=2', likes: 1700, views: 100000, isVideo: true },
        { url: 'https://picsum.photos/400/600?random=3', likes: 800, views: 9900, isVideo: true },
        { url: 'https://picsum.photos/400/600?random=4', likes: 2400000, views: 36800000 },
        { url: 'https://picsum.photos/400/600?random=5', likes: 50, views: 710 },
        { url: 'https://picsum.photos/400/600?random=6', likes: 5240, views: 18000 }
      ],
      auctionHistory: [
        { title: 'Personal Styling Session', finalBid: 3200, date: '2024-12-20' },
        { title: 'Fashion Workshop', finalBid: 1800, date: '2024-12-15' }
      ],
      auctionItems: [
        {
          id: 'i1',
          name: 'Exclusive Fashion Consultation',
          currentBid: 2500,
          timer: 3600,
          imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
        },
        {
          id: 'i2',
          name: 'Personal Shopping Experience',
          currentBid: 1800,
          timer: 7200,
          imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400'
        }
      ]
    },
    {
      id: 'c2',
      name: 'Zara Mensah',
      age: 32,
      country: 'Ghana',
      nationality: '🇬🇭',
      bio: 'The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.',
      profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bookmarks: 8900000,
      downloads: 189,
      earnings: 32000,
      liveViewers: 32000,
      totalViews: 32000000,
      verified: true,
      approvalStatus: 'approved',
      genderVerified: true,
      images: [
        { url: 'https://picsum.photos/400/600?random=7', likes: 1200, views: 980000 },
        { url: 'https://picsum.photos/400/600?random=8', likes: 890, views: 67000 },
        { url: 'https://picsum.photos/400/600?random=9', likes: 450, views: 34000 },
        { url: 'https://picsum.photos/400/600?random=10', likes: 2100, views: 150000 },
        { url: 'https://picsum.photos/400/600?random=11', likes: 670, views: 45000 },
        { url: 'https://picsum.photos/400/600?random=12', likes: 1800, views: 120000 }
      ],
      currentAuction: 'Tech Mentorship Session',
      currentBid: 3200,
      timeLeft: '1h 30m',
      auctionHistory: [
        { title: 'Business Strategy Call', finalBid: 2800, date: '2024-12-18' }
      ],
      auctionItems: [
        {
          id: 'i3',
          name: 'Tech Mentorship Session',
          currentBid: 3200,
          timer: 5400,
          imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400'
        }
      ]
    },
    {
      id: 'c3',
      name: 'Kemi Adebayo',
      age: 35,
      country: 'Nigeria',
      bio: 'Celebrity chef and cookbook author. Bringing authentic African cuisine to the world.',
      profilePic: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      bookmarkers: 156000,
      views: 680000,
      totalEarnings: 67000,
      approvalStatus: 'approved',
      genderVerified: true,
      currentAuction: 'Private Cooking Class',
      currentBid: 4500,
      timeLeft: '30m',
      auctionHistory: [
        { title: 'Recipe Development Session', finalBid: 5200, date: '2024-12-22' },
        { title: 'Culinary Masterclass', finalBid: 3800, date: '2024-12-10' }
      ],
      auctionItems: [
        {
          id: 'i4',
          name: 'Private Cooking Class',
          currentBid: 4500,
          timer: 1800,
          imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
        }
      ]
    },
    {
      id: 'c4',
      name: 'Fatima Al-Rashid',
      age: 29,
      country: 'Morocco',
      bio: 'Beauty and wellness influencer promoting natural African skincare and self-care practices.',
      profilePic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bookmarkers: 98000,
      views: 290000,
      totalEarnings: 38000,
      approvalStatus: 'pending',
      genderVerified: true,
      auctionItems: []
    },
    {
      id: 'c5',
      name: 'Nomsa Mbeki',
      age: 26,
      country: 'South Africa',
      bio: 'Fitness coach and motivational speaker inspiring women across Africa to live their best lives.',
      profilePic: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bookmarkers: 112000,
      views: 420000,
      totalEarnings: 52000,
      approvalStatus: 'approved',
      genderVerified: true,
      currentAuction: 'Personal Training Session',
      currentBid: 1200,
      timeLeft: '4h 20m',
      auctionHistory: [
        { title: 'Fitness Consultation', finalBid: 1800, date: '2024-12-19' }
      ],
      auctionItems: [
        {
          id: 'i5',
          name: 'Personal Training Session',
          currentBid: 1200,
          timer: 4800,
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
        }
      ]
    },
    {
      id: 'c6',
      name: 'Aisha Kone',
      age: 31,
      country: 'Mali',
      bio: 'Traditional textile artist and fashion designer preserving African heritage through modern designs.',
      profilePic: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
      bookmarkers: 76000,
      views: 180000,
      totalEarnings: 29000,
      approvalStatus: 'approved',
      genderVerified: true,
      currentAuction: 'Custom Textile Design',
      currentBid: 3800,
      timeLeft: '1h 50m',
      auctionHistory: [
        { title: 'Traditional Weaving Workshop', finalBid: 2200, date: '2024-12-16' }
      ],
      auctionItems: [
        {
          id: 'i6',
          name: 'Custom Textile Design',
          currentBid: 3800,
          timer: 6600,
          imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400'
        }
      ]
    },
    {
      id: 'c7',
      name: 'Thandiwe Nkomo',
      age: 27,
      country: 'Zimbabwe',
      bio: 'Music producer and artist promoting African sounds and supporting emerging musicians.',
      profilePic: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
      bookmarkers: 134000,
      views: 520000,
      totalEarnings: 61000,
      approvalStatus: 'approved',
      genderVerified: true,
      currentAuction: 'Music Production Session',
      currentBid: 2200,
      timeLeft: '40m',
      auctionHistory: [
        { title: 'Song Writing Workshop', finalBid: 2800, date: '2024-12-21' }
      ],
      auctionItems: [
        {
          id: 'i7',
          name: 'Music Production Session',
          currentBid: 2200,
          timer: 2400,
          imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
        }
      ]
    },
    {
      id: 'c8',
      name: 'Nia Asante',
      age: 30,
      country: 'Ghana',
      bio: 'Environmental activist and sustainable living advocate educating communities about eco-friendly practices.',
      profilePic: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400',
      bookmarkers: 87000,
      views: 210000,
      totalEarnings: 34000,
      approvalStatus: 'rejected',
      genderVerified: false,
      auctionItems: []
    },
    {
      id: 'c9',
      name: 'Safiya Hassan',
      age: 33,
      country: 'Kenya',
      bio: 'Business consultant and entrepreneur helping African women start and scale their businesses.',
      profilePic: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400',
      bookmarkers: 145000,
      views: 590000,
      totalEarnings: 78000,
      approvalStatus: 'approved',
      genderVerified: true,
      currentAuction: 'Business Strategy Consultation',
      currentBid: 5200,
      timeLeft: '20m',
      auctionHistory: [
        { title: 'Startup Pitch Review', finalBid: 4200, date: '2024-12-23' },
        { title: 'Business Plan Development', finalBid: 6800, date: '2024-12-12' }
      ],
      auctionItems: [
        {
          id: 'i8',
          name: 'Business Strategy Consultation',
          currentBid: 5200,
          timer: 1200,
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        }
      ]
    },
    {
      id: 'c10',
      name: 'Amina Diallo',
      age: 25,
      country: 'Senegal',
      bio: 'Digital artist and graphic designer creating stunning visual content inspired by African culture.',
      profilePic: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400',
      bookmarkers: 92000,
      views: 340000,
      totalEarnings: 41000,
      approvalStatus: 'approved',
      genderVerified: true,
      currentAuction: 'Custom Digital Art Commission',
      currentBid: 1600,
      timeLeft: '1h 30m',
      auctionHistory: [
        { title: 'Logo Design Package', finalBid: 2400, date: '2024-12-17' }
      ],
      auctionItems: [
        {
          id: 'i9',
          name: 'Custom Digital Art Commission',
          currentBid: 1600,
          timer: 5400,
          imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400'
        }
      ]
    }
  ],
  
  viewers: [
    {
      id: 'v1',
      name: 'John Smith',
      email: 'john@example.com',
      country: 'South Africa',
      totalSpent: 15000,
      activeBids: 3,
      wonAuctions: 5
    },
    {
      id: 'v2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      country: 'Kenya',
      totalSpent: 8500,
      activeBids: 2,
      wonAuctions: 3
    }
  ],

  transactions: [
    {
      id: 't1',
      userId: 'v1',
      creatorId: 'c1',
      creatorName: 'Amara Okafor',
      description: 'Fashion Consultation',
      amount: 2500,
      timestamp: '2024-12-28T10:30:00Z',
      status: 'completed'
    },
    {
      id: 't2',
      userId: 'v2',
      creatorId: 'c2',
      creatorName: 'Zara Mensah',
      description: 'Tech Mentorship',
      amount: 3200,
      timestamp: '2024-12-27T14:20:00Z',
      status: 'pending'
    },
    {
      id: 't3',
      userId: 'v1',
      creatorId: 'c3',
      creatorName: 'Kemi Adebayo',
      description: 'Private Cooking Class',
      amount: 4500,
      timestamp: '2024-12-26T16:45:00Z',
      status: 'completed'
    },
    {
      id: 't4',
      userId: 'v2',
      creatorId: 'c1',
      creatorName: 'Amara Okafor',
      description: 'Personal Shopping Experience',
      amount: 1800,
      timestamp: '2024-12-25T11:15:00Z',
      status: 'failed'
    }
  ],

  bids: [
    {
      id: 'b1',
      userId: 'v1',
      creatorId: 'c1',
      creatorName: 'Amara Okafor',
      item: 'Fashion Consultation',
      amount: 2500,
      timestamp: '2024-12-28T10:30:00Z',
      status: 'won'
    },
    {
      id: 'b2',
      userId: 'v2',
      creatorId: 'c2',
      creatorName: 'Zara Mensah',
      item: 'Tech Mentorship Session',
      amount: 3200,
      timestamp: '2024-12-27T14:20:00Z',
      status: 'active'
    },
    {
      id: 'b3',
      userId: 'v1',
      creatorId: 'c3',
      creatorName: 'Kemi Adebayo',
      item: 'Private Cooking Class',
      amount: 4500,
      timestamp: '2024-12-26T16:45:00Z',
      status: 'won'
    },
    {
      id: 'b4',
      userId: 'v2',
      creatorId: 'c1',
      creatorName: 'Amara Okafor',
      item: 'Personal Shopping Experience',
      amount: 1800,
      timestamp: '2024-12-25T11:15:00Z',
      status: 'lost'
    },
    {
      id: 'b5',
      userId: 'v1',
      creatorId: 'c2',
      creatorName: 'Zara Mensah',
      item: 'Business Strategy Call',
      amount: 2800,
      timestamp: '2024-12-24T09:30:00Z',
      status: 'active'
    }
  ],

  messages: [
    {
      id: 'm1',
      senderId: 'v1',
      receiverId: 'c1',
      text: 'Thank you for the amazing consultation!',
      timestamp: '2024-12-28T10:30:00Z',
      type: 'text'
    },
    {
      id: 'm2',
      senderId: 'c1',
      receiverId: 'v1',
      text: 'You\'re welcome! Feel free to reach out anytime.',
      timestamp: '2024-12-28T10:35:00Z',
      type: 'text'
    }
  ],

  africanCountries: [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
    'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros',
    'Congo', 'Democratic Republic of Congo', 'Djibouti', 'Egypt',
    'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon',
    'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya',
    'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali',
    'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia',
    'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal',
    'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan',
    'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
  ],

  users: [
    {
      id: 'v1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      accountType: 'viewer',
      country: 'Nigeria',
      nationality: 'Nigerian',
      isAuthenticated: true,
      completedBids: 3,
      totalSpent: 7000
    },
    {
      id: 'v2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      accountType: 'viewer',
      country: 'Ghana',
      nationality: 'Ghanaian',
      isAuthenticated: true,
      completedBids: 1,
      totalSpent: 3200
    },
    {
      id: 'c1',
      firstName: 'Amara',
      lastName: 'Okafor',
      email: 'amara.okafor@example.com',
      accountType: 'creator',
      country: 'Nigeria',
      nationality: 'Nigerian',
      isAuthenticated: true
    }
  ],

  chats: [
    {
      id: 'ch1',
      userId: 'v1',
      creatorId: 'c1',
      creatorName: 'Amara Okafor',
      messageCount: 15,
      lastMessage: 'Thank you for the amazing consultation!',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'active'
    },
    {
      id: 'ch2',
      userId: 'v1',
      creatorId: 'c3',
      creatorName: 'Kemi Adebayo',
      messageCount: 8,
      lastMessage: 'Looking forward to our cooking session!',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'active'
    },
    {
      id: 'ch3',
      userId: 'v2',
      creatorId: 'c2',
      creatorName: 'Zara Mensah',
      messageCount: 3,
      lastMessage: 'When can we schedule the mentorship?',
      timestamp: '2024-01-13T10:20:00Z',
      status: 'active'
    }
  ],

  payments: [
    {
      id: 'p1',
      userId: 'v1',
      creatorId: 'c1',
      creatorName: 'Amara Okafor',
      itemName: 'Fashion Consultation',
      amount: 2500,
      status: 'completed',
      timestamp: '2024-01-14T18:00:00Z'
    },
    {
      id: 'p2',
      userId: 'v1',
      creatorId: 'c3',
      creatorName: 'Kemi Adebayo',
      itemName: 'Private Cooking Class',
      amount: 4500,
      status: 'completed',
      timestamp: '2024-01-15T12:00:00Z'
    },
    {
      id: 'p3',
      userId: 'v2',
      creatorId: 'c2',
      creatorName: 'Zara Mensah',
      itemName: 'Tech Mentorship Session',
      amount: 3200,
      status: 'pending',
      timestamp: '2024-01-13T15:30:00Z'
    }
  ],

  viewerCounts: {
    c1: 45,
    c2: 32,
    c3: 28,
    c4: 67,
    c5: 23,
    c6: 41,
    c7: 19,
    c8: 55,
    c9: 38,
    c10: 29
  },

  // Auction winners who can chat with creators
  auctionWinners: [
    { userId: 'v1', creatorId: 'c1', auctionId: 'i1', wonAt: '2024-12-28T10:30:00Z' },
    { userId: 'v1', creatorId: 'c3', auctionId: 'i4', wonAt: '2024-12-26T16:45:00Z' },
    { userId: 'v2', creatorId: 'c2', auctionId: 'i3', wonAt: '2024-12-27T14:20:00Z' }
  ],

  // User bookmarks
  bookmarks: [
    { id: 'bm1', userId: 'v1', creatorId: 'c1', timestamp: '2024-12-28T10:30:00Z' },
    { id: 'bm2', userId: 'v1', creatorId: 'c3', timestamp: '2024-12-26T16:45:00Z' },
    { id: 'bm3', userId: 'v2', creatorId: 'c2', timestamp: '2024-12-27T14:20:00Z' }
  ],

  content: {
    landingPage: {
      title: 'Ego - Where Attention Is Power',
      subtitle: 'A luxury social auction platform designed for African women to monetize their influence through competitive bidding.',
      stats: {
        activeCreators: 1250,
        totalBids: 45000,
        totalEarnings: 2500000
      },
      features: [
        {
          title: 'Exclusive Auctions',
          description: 'Bid on unique items and experiences from top African creators.'
        },
        {
          title: 'Real-time Bidding',
          description: 'Engage in live auctions with dynamic updates and competitive bidding.'
        },
        {
          title: 'Secure Transactions',
          description: 'Ensuring safe and transparent transactions for all users.'
        },
        {
          title: 'Community Connection',
          description: 'Connect with creators and other enthusiasts in a vibrant community.'
        }
      ]
    },
    
    aboutPage: {
      title: 'About Ego',
      mission: 'To empower African women creators by providing a platform where their attention and influence can be monetized through competitive bidding, creating sustainable income streams and meaningful connections.',
      vision: 'To become the leading platform for attention monetization in Africa, fostering economic empowerment and cultural exchange.',
      values: [
        'Empowerment of African women',
        'Transparency in all transactions',
        'Cultural celebration and preservation',
        'Innovation in social commerce',
        'Community building and support'
      ],
      team: [
        {
          name: 'Adaora Okonkwo',
          role: 'CEO & Founder',
          bio: 'Tech entrepreneur with 10+ years in fintech and social platforms.'
        },
        {
          name: 'Fatima Al-Rashid',
          role: 'CTO',
          bio: 'Former Google engineer specializing in scalable auction systems.'
        },
        {
          name: 'Nomsa Mbeki',
          role: 'Head of Community',
          bio: 'Social media expert with deep understanding of African markets.'
        }
      ]
    },

    contactPage: {
      title: 'Contact Us',
      description: 'Get in touch with our team for support, partnerships, or general inquiries.',
      email: 'hello@ego-platform.com',
      phone: '+234 800 123 4567',
      address: 'Lagos, Nigeria',
      hours: 'Monday - Friday, 9:00 AM - 6:00 PM WAT',
      faq: [
        {
          question: 'How do I become a creator?',
          answer: 'Apply through our registration process with gender verification and wait for admin approval.'
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept major credit cards, bank transfers, and mobile money payments.'
        },
        {
          question: 'How long do auctions last?',
          answer: 'Auction duration varies by creator, typically ranging from 1 hour to 24 hours.'
        }
      ]
    },

    termsPage: {
      title: 'Terms of Service',
      sections: [
        {
          heading: 'Platform Rules',
          content: 'All users must comply with our community guidelines and auction rules. Creators must be verified African women, and all transactions must be completed within 24 hours of auction end.'
        },
        {
          heading: 'Bidding Guidelines',
          content: 'Bids are binding commitments. Winners must complete payment within 24 hours. Maximum bid amount is $250,000 per item.'
        },
        {
          heading: 'Privacy Policy',
          content: 'We protect user data and only share information necessary for transaction completion. Messages are retained for 24 hours only.'
        },
        {
          heading: 'Dispute Resolution',
          content: 'Any disputes will be resolved through our internal mediation process. Users agree to binding arbitration for unresolved issues.'
        }
      ]
    }
  }
};

export default dummyData;

